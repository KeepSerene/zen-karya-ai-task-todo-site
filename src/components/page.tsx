function PageProvider({ children }: { children: React.ReactNode }) {
  return <div className="wrapper md:max-w-screen-md">{children}</div>;
}

function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <section className="pt-2 pb-3 md:px-4 lg:px-10 space-y-2">
      {children}
    </section>
  );
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-semibold">{children}</h1>;
}

function PageContent({ children }: { children: React.ReactNode }) {
  return <div className="pt-2 pb-20 md:px-4 lg:px-10">{children}</div>;
}

export { PageProvider, PageHeader, PageTitle, PageContent };
