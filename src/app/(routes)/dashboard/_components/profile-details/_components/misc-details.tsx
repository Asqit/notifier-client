import { Calendar, Link2, MapPin } from "lucide-react";

interface Props {
  createdAt: string;
  web: string;
  location: string;
}

export function MiscDetails({ createdAt, location, web }: Props) {
  const date = new Date(createdAt);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${month} ${year}`;

  return (
    <div className="text-sm flex items-center gap-2 flex-wrap text-zinc-500">
      {location && (
        <div className="gap-1 flex items-center">
          <MapPin size={14} /> {location}
        </div>
      )}

      {web && (
        <a href={web} target="_blank" className="gap-1 flex items-center">
          <Link2 size={14} /> {web}
        </a>
      )}

      {createdAt && (
        <div className="gap-1 flex items-center">
          <Calendar size={14} /> Joined {formattedDate}
        </div>
      )}
    </div>
  );
}
