export interface NavLinks {
  href: string;
  text: string;
}

export interface MobileMenuProps {
  links: NavLinks[];
  hasScrolled: boolean | undefined;
}

export interface MobileMenuOverlayProps {
  isMenuActive: boolean;
  links: NavLinks[];
}

export interface NavTriggerProps {
  isMenuActive: boolean;
  callback(): void;
  disabled?: boolean;
  className?: string;
}
