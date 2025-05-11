import { getPressFileDetails } from '@server';
import { PressFileDetails } from '../../../press-file/components';

type Params = Promise<{ id: string }>;

interface NewsDetailsPageProps {
  params: Params;
}

const NewsDetailsPage = async ({ params }: NewsDetailsPageProps) => {
  const { id } = await params;

  const { date, title, description, imageUrl } = (await getPressFileDetails(
    id
  )) || { date: '', title: '', description: '', imageUrl: '' };
  return (
    <div>
      <PressFileDetails details={{ date, title, description, imageUrl }} />
    </div>
  );
};

export default NewsDetailsPage;
