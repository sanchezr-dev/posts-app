import { GetServerSideProps } from "next"
import FetchJson from "@/lib/fetchJson"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts"
  const apiResponse = await FetchJson.get(apiUrl)
  const token = (context.req as any).session?.data?.accessToken

  return {
    props: {
      token: token || null,
      postList: (apiResponse as any).slice(0, 20),
    },
  }
}

const HomePage = ({ token, postList }: { token: string; postList: any }) => {
  return (
    <div className="px-36 py-24 bg-green-600">
      <h3 className="text-white mb-12 font-bold text-4xl">Latest posts</h3>
      <h5 className="text-white mb-3 font-bold text-xl">Access token</h5>
      <p className="text-white mb-9 text-sm break-words">{token}</p>
      {postList.map((post: any) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg mb-9">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {post.title}
          </h2>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default HomePage
