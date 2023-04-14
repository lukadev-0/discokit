import Link from "next/link";

export type Props = {
  items: [[string, string], string][];
};

export function ItemList(props: Props) {
  const { items } = props;

  return (
    <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {items.map((item) => {
        const [[name, href], description] = item;

        return (
          <li className="flex py-4" key={name}>
            <strong className="w-40">
              <Link
                href={href}
                className="text-blue-600 font-medium dark:text-blue-500"
              >
                {name}
              </Link>
            </strong>
            <p>{description}</p>
          </li>
        );
      })}
    </ul>
  );
}
