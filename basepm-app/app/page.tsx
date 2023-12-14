import UserStoryList from "@/components/userStory/userStoryList"
import UserStoryHeader from "../components/userStory/userStoryHeader"

export default function Home() {
  return (
    <div>
      <UserStoryHeader />
      <main>
        <UserStoryList />
      </main>  
    </div>
  )
}
