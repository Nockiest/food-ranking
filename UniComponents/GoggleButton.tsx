type GoogleButtonProps = {
    onClick: () => void;
  };

  const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick }) => {
    const buttonStyles: React.CSSProperties = {
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      margin: '10px',
      display: 'inline-block',
      width: '240px',
      height: '50px',
      backgroundColor: '#4285f4',
      color: '#fff',
      borderRadius: '5px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, .25)',
      transition: 'background-color .218s, border-color .218s, box-shadow .218s',
      cursor: 'pointer',
    };

    const buttonHoverStyles: React.CSSProperties = {
      WebkitBoxShadow: '0 0 3px 3px rgba(66, 133, 244, .3)',
      boxShadow: '0 0 3px 3px rgba(66, 133, 244, .3)',
    };

    const contentWrapperStyles: React.CSSProperties = {
      height: '100%',
      width: '100%',
      border: '1px solid transparent',
    };

    const logoWrapperStyles: React.CSSProperties = {
      padding: '15px',
      background: '#fff',
      width: '48px',
      height: '100%',
      borderRadius: '5px',
      display: 'inline-block',
    };

    const textContainerStyles: React.CSSProperties = {
      fontFamily: 'Roboto, arial, sans-serif',
      fontWeight: '500',
      letterSpacing: '.21px',
      fontSize: '16px',
      lineHeight: '48px',
      verticalAlign: 'top',
      border: 'none',
      display: 'inline-block',
      textAlign: 'center',
      width: '180px',
    };

    return (
      <div
        style={buttonStyles}
        className="g-sign-in-button"
        onMouseEnter={() => {
          Object.assign(buttonStyles, buttonHoverStyles);
        }}
        onMouseLeave={() => {
          Object.assign(buttonStyles, { ...buttonStyles, ...buttonHoverStyles });
        }}
        onClick={onClick}
      >
        <div style={contentWrapperStyles} className="content-wrapper">
          <div style={logoWrapperStyles} className="logo-wrapper">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" />
          </div>
          <span style={textContainerStyles} className="text-container">
            <span>Sign in with Google</span>
          </span>
        </div>
      </div>
    );
  };

  export default GoogleButton;