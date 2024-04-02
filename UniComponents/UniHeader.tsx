import { BUTTON_SIZES, BUTTON_STYLES } from "@/styles/button";
import { LINK_STYLES } from "@/styles/link";
import { POSITIONING } from "@/styles/positioning";
import * as stylex from "@stylexjs/stylex";
import Link from "next/link";

import { SHADOWS } from "@/styles/Variables";
import { INHERIT } from "@/styles/Inherit";
import { HEADER } from "@/styles/header";
import { ROUNDING, MARGIN } from "@/styles/Variables";
import Button from "@/components/Button";
import Mylink from "@/components/Mylink";

const UniversalHeader = ({
    isAuthenticated = false,
    pages,
    appName,
    NavBarBtnStyling,
    HeaderStyling,
    LogoStyling
  }: {
    isAuthenticated: boolean;
    pages: string[];
    appName: string;
    NavBarBtnStyling: stylex.StaticStylesWithout<{}>[];
    HeaderStyling: stylex.StaticStylesWithout<{}>[];
    LogoStyling: stylex.StaticStylesWithout<{}>[];
  }) => {
    return (
      <div style={{ height: '100px' }}>
        <header id="nav-wrapper" {...stylex.props(...HeaderStyling)}>
          <nav id="nav" {...stylex.props(HEADER.nav, POSITIONING.rowResponsive)}>
            <h1 className="logo un-skew" {...stylex.props(...LogoStyling)}>
              <a href="#home" {...stylex.props(INHERIT.inherit)} style={{ textDecoration: 'none' }}>
                {appName}
              </a>
            </h1>

            <div className="nav right" {...stylex.props(POSITIONING.rowResponsive, MARGIN.xxl)}>
              {pages.map((page, index) => (
                <Button type={BUTTON_STYLES.primary} styling={NavBarBtnStyling} key={index}>
                  <Mylink href={page === 'home' ? '/' : `/${page}`}>{page}</Mylink>
                </Button>
              ))}
            </div>
          </nav>
          {!isAuthenticated && <p>google login button</p>}
        </header>
      </div>
    );
  };

  export default UniversalHeader;

      {/* <UniversalHeader
      appName={'Survey App'}
      pages={['home', 'about', 'contact', 'pricing']}
      NavBarBtnStyling={[BUTTON_STYLES.btnNav]}
      isAuthenticated={false}
      HeaderStyling={[HEADER.navWrapper, SHADOWS.sm]}
      LogoStyling={[ HEADER.h1, ROUNDING.md]}

    /> */}