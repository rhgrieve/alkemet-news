import { parse } from 'url';

export default function ItemInfo({ item }) {
  return (
    <div key={item.id} className="my-2">
      <div className="flex flex-row">
        <a href={item.url} target="_blank">
          {item.title}{' '}
          {item.type != 'comment' && (
            <span className="text-gray-700 text-sm">
              (
              {item.url ? parse(item.url).hostname.replace('www.', '') : 'self'}
              )
            </span>
          )}
        </a>
      </div>
    </div>
  );
}
