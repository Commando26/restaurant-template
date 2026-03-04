import MenuItem from '@/components/ui/MenuItem';

interface MenuSectionProps {
  items: any[];
  layout?: 'grid' | 'list';
}

export default function MenuSection({ items, layout = 'grid' }: MenuSectionProps) {
  if (!items || items.length === 0) return null;

  if (layout === 'list') {
    return (
      <div className="space-y-6">
        {items.map((item) => (
          <MenuItem key={item._id} item={item} variant="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuItem key={item._id} item={item} variant="card" />
      ))}
    </div>
  );
}
