interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <section>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="mt-2 text-gray-500">{description}</p>
    </section>
  );
}
