import MailList from '@app/components/MailList';
import getProperty from '@app/actions/getProperty';
import EmptyState from '@app/components/EmptyState';
import getCurrentUser from '@app/actions/getCurrentUser';
import PropertyClient from './PropertyClient';

interface IParams {
  id?: string;
}

export default async function Hotel ({ params }: { params: IParams }) {  
  const currentUser = await getCurrentUser()
  const property = await getProperty(params);

  if (!property) {
    return (
      <EmptyState />
    );
  }

  return (
    <div className="max-width padding-x padding-y max-md:p-0">
      <PropertyClient 
        property={property}
        currentUser={currentUser}
      />
      <MailList />
    </div>
  )
};
