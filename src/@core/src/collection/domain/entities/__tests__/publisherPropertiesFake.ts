import { PublisherProperties } from '#collection/domain';


const publisherPropertiesFake: PublisherProperties = {
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'publisher'
}

export const getBookPropertiesFake = (
  bookProperties?: Partial<PublisherProperties>,
) => ({
  ...publisherPropertiesFake,
  ...bookProperties,
});
