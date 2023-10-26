import ProfilePictureForm from "@/components/forms/profile-photo-form";
import { store } from "@/stores";
import { fetchUser } from "@/stores/user";
import { getToken } from "@/lib/token";

export default async function AccountPage() {
    await store.dispatch(fetchUser(getToken()))
    const { user } = store.getState().user
    const imageServiceUrl = process.env.AWS_BUCKET_URL || "";
    return <>
        <ProfilePictureForm imageService={imageServiceUrl} user={user} />
    </>
}