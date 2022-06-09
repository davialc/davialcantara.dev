import type { NextApiRequest, NextApiResponse } from 'next';
import { polygonApi } from '../../services/axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.POLYGON_API_KEY;
  const ownerAddr = '0xB6391144F5D044622f66EE2d53F9003d717f7B65';
  const { data } = await polygonApi.get(
    `/${apiKey}/getNFTs?owner=${ownerAddr}`,
  );

  const { ownedNfts } = data;

  const collections = ownedNfts.map((nft: any) => ({
    name: nft.title.split(' #')[0],
  }));

  const nfts = collections.map((collection: any) => ({
    collectionName: collection.name.includes('#') ? '-' : collection.name,
    openseaUrl: `https://opensea.io/collection/${collection.name
      .replace(' ', '-')
      .toLowerCase()}`,
    nfts: ownedNfts
      .filter((nft: any) => nft.title.split(' #')[0] === collection.name)
      .map((nft: any) => ({
        title: nft.title,
        description: nft.description,
        contract: nft.contract.address,
        image: nft.media.gateway,
        id: nft.metadata.dna,
        openseaUrl: `https://opensea.io/assets/matic/${nft.contract.address}/${
          nft.title.split(' #')[1]
        }`,
      })),
  }));

  res.status(200).json(nfts);
};
