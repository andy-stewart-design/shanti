export interface NavLinks {
  href: string;
  text: string;
}

export interface MobileMenuProps {
  links: NavLinks[];
}

export interface MobileMenuOverlayProps {
  isMenuMounted: boolean | undefined;
  isMenuRendered: boolean | undefined;
  links: NavLinks[];
}

export interface NavTriggerProps {
  isMenuActive: boolean;
  callback(): void;
}
