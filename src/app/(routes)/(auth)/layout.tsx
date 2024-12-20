interface Props {
  children: Readonly<React.ReactNode>;
}

export default function AuthLayout({ children }: Props) {
  return (
    <section className="w-full h-screen">
      <div className="container mx-auto max-w-screen-xl h-full">{children}</div>
    </section>
  );
}
