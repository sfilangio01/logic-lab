import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function LearningBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="learning-breadcrumbs" aria-label="Percorso di navigazione">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
