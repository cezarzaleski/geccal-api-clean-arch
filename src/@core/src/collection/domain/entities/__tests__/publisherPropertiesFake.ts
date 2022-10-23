import { PublisherProperties } from '#collection/domain';


const publisherPropertiesFake: PublisherProperties = {
  createdAt: new Date(),
  updatedAt: new Date(),
  active: true,
  name: 'publisher'
}

export const getPublisherPropertiesFake = (
  bookProperties?: Partial<PublisherProperties>,
) => ({
  ...publisherPropertiesFake,
  ...bookProperties,
});
