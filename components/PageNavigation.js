import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PageNavigation() {
  const router = useRouter();

  return (
    <div>
      {router.asPath != '/' && (
        <Link
          href={`/${
            router.asPath === ('/2' || '/1')
              ? ''
              : parseInt(router.asPath.replace('/', '')) - 1
          }`}
        >
          <a className="mr-6">&lt; Back</a>
        </Link>
      )}

      <Link
        href={`/${
          router.asPath === '/'
            ? '2'
            : parseInt(router.asPath.replace('/', '')) + 1
        }`}
      >
        <a>Next &gt;</a>
      </Link>
    </div>
  );
}
