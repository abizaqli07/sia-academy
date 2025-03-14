import Link from "next/link"
import { Button } from "~/components/ui/button"
import { auth } from "~/server/auth"


const HomePage = async () => {
  const session = await auth()

  return (
    <div>
      <div>Home Page</div>
      <Link href={"/auth/signin"}><Button>Sign In</Button></Link>
      <Link href={"/auth/register_mentor"}><Button>Register Mentor</Button></Link>
      <div>{session?.user.id ?? ""}</div>
      <div>{session?.user.role ?? ""}</div>
    </div>
  )
}

export default HomePage