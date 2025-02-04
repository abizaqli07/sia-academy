import { auth } from "~/server/auth"


const HomePage = async () => {
  const session = await auth()

  return (
    <div>
      <div>Home Page</div>
      <div>{session?.user.id ?? ""}</div>
      <div>{session?.user.role ?? ""}</div>
    </div>
  )
}

export default HomePage