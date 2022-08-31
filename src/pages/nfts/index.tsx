import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { DefaultProfile } from '../../components/DefaultProfile';
import { NftCollectionCard } from '../../components/NftCollectionCard';
import { CardContainer } from '../../components/NftCollectionCard/styles';
import { Nothing } from '../../components/Nothing';
import { ProfileConnectButton } from '../../components/ProfileConnectButton';
import { SearchNft } from '../../components/SearchNft';
import { nftApi } from '../../services/axios';
import { Box } from '../../styles/primitives/Box';
import { Text } from '../../styles/primitives/Text';
import { VerticalBox } from '../../styles/primitives/VerticalBox';
import { INftCollection } from '../../types/nfts';

interface NftsProps {
  nfts: INftCollection[];
}

const Nfts = ({ nfts }: NftsProps) => {
  const { data: walletAccount } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (walletAccount) {
      router.push(`/nfts/${walletAccount.address}`);
    } else {
      router.push('/nfts');
    }
  }, [walletAccount]);

  return (
    <>
      <Box variant="page">
        <VerticalBox as="header" css={{ gap: '$10' }}>
          <VerticalBox>
            <Text type="title">NFTs</Text>
            <Text type="paragraph">My NFTs</Text>
          </VerticalBox>
          <SearchNft />
          <Box css={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <DefaultProfile />
            <ProfileConnectButton />
          </Box>
        </VerticalBox>
        <VerticalBox>
          {nfts.length ? (
            <CardContainer type="multiple">
              {nfts.map(collection => (
                <NftCollectionCard
                  key={collection.openseaUrl}
                  collection={collection}
                />
              ))}
            </CardContainer>
          ) : (
            <Nothing />
          )}
        </VerticalBox>
      </Box>
    </>
  );
};

export default Nfts;

export const getStaticProps: GetStaticProps = async () => {
  const { data: nfts } = await nftApi.get('/api/polygon');
  return {
    props: {
      nfts,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
