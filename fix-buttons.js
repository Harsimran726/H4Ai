const fs = require('fs');
const path = require('path');

const files = [
  'app/not-found.tsx',
  'app/page.tsx',
  'app/services/agentic-ai-systems/page.tsx',
  'app/services/ai-integration-development/page.tsx',
  'app/services/ai-voice-agents/page.tsx',
  'app/services/social-media-management/page.tsx',
  'app/services/website-development/page.tsx',
  'components/marketing/hero.tsx',
  'components/marketing/nav.tsx'
];

files.forEach(f => {
  const filePath = path.join(process.cwd(), f);
  let content = fs.readFileSync(filePath, 'utf8');

  // ensure buttonVariants is imported
  if (content.includes('from "@/components/ui/button"') && !content.includes('buttonVariants')) {
    content = content.replace('import { Button }', 'import { Button, buttonVariants }');
  }

  // Handle all variations of <Button asChild ...>
  // 1: size + variant + className
  content = content.replace(/<Button\s+size="([^"]+)"\s+variant="([^"]+)"\s+asChild\s+className="([^"]+)">\s*<Link\s+href="([^"]+)">([^<]+)<\/Link>\s*<\/Button>/g, 
    '<Link href="$4" className={buttonVariants({ size: "$1", variant: "$2", className: "$3" })}>$5</Link>');

  // 2: variant + asChild + className
  content = content.replace(/<Button\s+variant="([^"]+)"\s+asChild\s+className="([^"]+)">\s*<Link\s+href="([^"]+)">([^<]+)<\/Link>\s*<\/Button>/g, 
    '<Link href="$3" className={buttonVariants({ variant: "$1", className: "$2" })}>$4</Link>');

  // 3: asChild + variant + className
  content = content.replace(/<Button\s+asChild\s+variant="([^"]+)"\s+className="([^"]+)">\s*<Link\s+href="([^"]+)">([^<]+)<\/Link>\s*<\/Button>/g, 
    '<Link href="$3" className={buttonVariants({ variant: "$1", className: "$2" })}>$4</Link>');

  // 4: size + asChild + className
  content = content.replace(/<Button\s+size="([^"]+)"\s+asChild\s+className="([^"]+)">\s*<Link\s+href="([^"]+)">([^<]+)<\/Link>\s*<\/Button>/g, 
    '<Link href="$3" className={buttonVariants({ size: "$1", className: "$2" })}>$4</Link>');

  // 5: asChild + className
  content = content.replace(/<Button\s+asChild\s+className="([^"]+)">\s*<Link\s+href="([^"]+)">([^<]+)<\/Link>\s*<\/Button>/g, 
    '<Link href="$2" className={buttonVariants({ className: "$1" })}>$3</Link>');

  // 6: asChild + className but with className first
  content = content.replace(/<Button\s+className="([^"]+)"\s+asChild>\s*<Link\s+href="([^"]+)">([^<]+)<\/Link>\s*<\/Button>/g, 
    '<Link href="$2" className={buttonVariants({ className: "$1" })}>$3</Link>');

  fs.writeFileSync(filePath, content);
});
