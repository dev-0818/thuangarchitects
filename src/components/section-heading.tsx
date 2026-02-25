type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  className?: string;
};

export const SectionHeading = ({ eyebrow, title, className = "" }: SectionHeadingProps) => (
  <header className={`section-heading ${className}`.trim()}>
    {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
    <h1>{title}</h1>
  </header>
);

