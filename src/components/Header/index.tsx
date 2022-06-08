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
            <NavbarItem className={asPath === '/' ? 'activeLink' : undefined}>
              <Link href="/">
                <CustomHomeIcon />
              </Link>
            </NavbarItem>
          </Tooltip>
          <Tooltip content="Writing">
            <NavbarItem
              className={asPath === '/writing' ? 'activeLink' : undefined}
            >
              <Link href="/writing">
                <CustomLetterIcon />
              </Link>
            </NavbarItem>
          </Tooltip>
          <Tooltip content="Projects">
            <NavbarItem
              className={asPath === '/projects' ? 'activeLink' : undefined}
            >
              <Link href="/projects">
                <CustomLightningIcon />
              </Link>
            </NavbarItem>
          </Tooltip>
          <Tooltip content="NFTs">
            <NavbarItem
              className={asPath === '/nfts' ? 'activeLink' : undefined}
            >
              <Link href="/nfts">
                <CustomNFTIcon />
              </Link>
            </NavbarItem>
          </Tooltip>
          <Divider />
          <Tooltip content="Home">
            <NavbarItem>
              <CustomGithubIcon />
            </NavbarItem>
          </Tooltip>
          <Tooltip content="Home">
            <NavbarItem>
              <CustomTwitterIcon />
            </NavbarItem>
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
