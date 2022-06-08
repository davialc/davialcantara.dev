import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box } from '../../../stitches.config';
import { Tooltip } from '../../styles/Tooltip';
import { MobileMenu } from '../MobileMenu/index';
import {
  CustomAvatarIcon,
  CustomGithubIcon,
  CustomHomeIcon,
  CustomLetterIcon,
  CustomLightningIcon,
  CustomMobileMenuIcon,
  CustomMoonIcon,
  CustomNFTIcon,
  CustomSunIcon,
  CustomTwitterIcon,
  Divider,
  Navbar,
  NavbarButton,
  NavbarGroup,
  NavbarItem,
} from './styles';

export const Header = () => {
  const { setTheme, theme } = useTheme();
  const { asPath } = useRouter();
  return (
    <Box css={{ padding: '$9 $10' }}>
      <Navbar>
        <NavbarGroup data-mobile-menu>
          <MobileMenu>
            <CustomMobileMenuIcon />
          </MobileMenu>
        </NavbarGroup>
        <NavbarGroup data-desktop-navbar>
          <Tooltip content="Home">
            <Link href="/">
              <NavbarItem className={asPath === '/' ? 'activeLink' : undefined}>
                <CustomHomeIcon />
              </NavbarItem>
            </Link>
          </Tooltip>
          <Tooltip content="Writing">
            <Link href="/writing">
              <NavbarItem
                className={asPath === '/writing' ? 'activeLink' : undefined}
              >
                <CustomLetterIcon />
              </NavbarItem>
            </Link>
          </Tooltip>
          <Tooltip content="Projects">
            <Link href="/projects">
              <NavbarItem
                className={asPath === '/projects' ? 'activeLink' : undefined}
              >
                <CustomLightningIcon />
              </NavbarItem>
            </Link>
          </Tooltip>
          <Tooltip content="NFTs">
            <Link href="/nfts">
              <NavbarItem
                className={asPath === '/nfts' ? 'activeLink' : undefined}
              >
                <CustomNFTIcon />
              </NavbarItem>
            </Link>
          </Tooltip>
          <Divider />
          <Tooltip content="Home">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <NavbarItem>
                <CustomGithubIcon />
              </NavbarItem>
            </a>
          </Tooltip>
          <Tooltip content="Home">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <NavbarItem>
                <CustomTwitterIcon />
              </NavbarItem>
            </a>
          </Tooltip>
        </NavbarGroup>
        <NavbarGroup>
          <Tooltip content="Switch theme">
            <NavbarButton
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              css={{
                display: 'none',
                '@bp2': {
                  display: 'flex',
                },
              }}
            >
              {theme === 'light' ? <CustomMoonIcon /> : <CustomSunIcon />}
            </NavbarButton>
          </Tooltip>
          <Tooltip content="Connect wallet">
            <NavbarItem>
              <CustomAvatarIcon />
            </NavbarItem>
          </Tooltip>
        </NavbarGroup>
      </Navbar>
    </Box>
  );
};
