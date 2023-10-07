import Header from '@app/components/Header'
import Trending from '@app/components/home/Trending'
import Types from '@app/components/home/Types'
import Popular from '@app/components/home/Popular'
import MailList from '@app/components/MailList'
import getCurrentUser from './actions/getCurrentUser'
import getPopular from './actions/getPopular'

export default async function Home() {
  const currentUser = await getCurrentUser();
  const popular = await getPopular();

  return (
    <main className="max-width padding-x padding-y max-md:p-0">
      <Header currentUser={currentUser} />

      <div className="w-full max-w-[1160px] max-md:px-5 mx-auto mt-36 max-lg:mt-72">
        <div className="mb-5">
          <h2 className="font-bold text-2xl">Trending destinations</h2>
          <p className="text-gray-500 mt-1">Most popular choices for travelling</p>
        </div>
        <Trending />
      </div>

      <div className="w-full max-w-[1160px] max-md:px-5 mx-auto mt-10">
        <div className="mb-5">
          <h2 className="font-bold text-2xl">Browse by property type</h2>
          <p className="text-gray-500 mt-1">Pick a vibe and explore the top destinations</p>
        </div>
        <Types />
      </div>

      <div className="w-full max-w-[1160px] max-md:px-5 mx-auto mt-10">
        <div className="mb-5">
          <h2 className="font-bold text-2xl">Homes guests love</h2>
          <p className="text-gray-500 mt-1">Let's go on an adventure</p>
        </div>
        <Popular currentUser={currentUser} popular={popular} />
      </div>

      <MailList />
    </main>
  )
};
