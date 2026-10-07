import Image from 'next/image';

type DeerProps = {
  className?: string;
  width: number;
  alt?: string;
  sizes?: string;
  eager?: boolean;
};

// Both variants are rendered; globals.css shows the one matching the active theme.
const Deer = ({ className, width, alt = '', sizes, eager }: DeerProps) => {
  const height = Math.round((width * 778) / 640);
  const shared = { width, height, sizes, fetchPriority: eager ? ('high' as const) : undefined };
  return (
    <>
      <Image {...shared} alt={alt} src="/images/deer-light.png" className={['only-light', className].filter(Boolean).join(' ')} />
      <Image {...shared} alt={alt} src="/images/deer-dark.png" className={['only-dark', className].filter(Boolean).join(' ')} />
    </>
  );
};

export default Deer;
