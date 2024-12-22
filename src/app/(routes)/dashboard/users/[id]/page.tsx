import { ProfileDetails } from "../../_components";

interface Params {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage(params: Params) {
  const { id } = await params.params;

  return (
    <div className="p-8">
      <ProfileDetails userId={Number(id)} />
    </div>
  );
}
