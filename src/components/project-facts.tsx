type ProjectFact = {
  label: string;
  value: string | number | string[] | null | undefined;
};

type ProjectFactsProps = {
  facts: ProjectFact[];
};

export const ProjectFacts = ({ facts }: ProjectFactsProps) => {
  const visibleFacts = facts.filter(({ value }) =>
    Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined && value !== ""
  );

  if (visibleFacts.length === 0) {
    return null;
  }

  return (
    <dl className="project-facts">
      {visibleFacts.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{Array.isArray(value) ? value.join(", ") : value}</dd>
        </div>
      ))}
    </dl>
  );
};
