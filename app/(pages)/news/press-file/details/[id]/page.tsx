import { getPressFileDetails } from '@server';
import { PressFileDetails } from '../../components';

type Params = Promise<{ id: string }>;

interface PressFileDetailsPageProps {
  params: Params;
}

const PressFileDetailsPage = async ({ params }: PressFileDetailsPageProps) => {
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

export default PressFileDetailsPage;
