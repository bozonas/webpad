import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useGoogleLogin from './GoogleLogin';
import Icon from './GoogleIcon';
import {
  logIn,
  logOut
} from '../../store/reducers/authentication';

const GoogleLoginButton = (props: any) => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const {
    className,
    render,
    autoLoad,
  } = props;

  let onSuccess = (user: gapi.auth2.GoogleUser) => 
    dispatch(logIn(user.getBasicProfile().getName()));

  const { signIn, loaded } = useGoogleLogin({
    onSuccess: onSuccess,
    autoLoad,
    isSignedIn: true,
    onFailure: dispatch(logOut),
  })
  
  const disabled = !loaded

  if (render) {
    return render({ onClick: signIn, disabled })
  }

  const initialStyle = {
    backgroundColor: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    color: 'rgba(0, 0, 0, .54)',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
    padding: 0,
    borderRadius: 2,
    border: '1px solid transparent',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto, sans-serif'
  }

  const hoveredStyle = {
    cursor: 'pointer',
    opacity: 0.9
  }

  const activeStyle = {
    cursor: 'pointer',
    backgroundColor: '#eee',
    color: 'rgba(0, 0, 0, .54)',
    opacity: 1
  }

  const defaultStyle = (() => {
    if (disabled) {
      return Object.assign({}, initialStyle, { opacity: 0.6 })
    }

    if (active) {
      return Object.assign({}, initialStyle, activeStyle)
    }

    if (hovered) {
      return Object.assign({}, initialStyle, hoveredStyle)
    }

    return initialStyle
  })()
  const googleLoginButton = React.createElement(
    'button',
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => {
        setHovered(false)
        setActive(false)
      },
      onMouseDown: () => setActive(true),
      onMouseUp: () => setActive(false),
      onClick: signIn,
      style: defaultStyle,
      type: 'button',
      disabled,
      className
    },
    [
      <Icon key={1} active={active} />,
      <span key={2} style={{ paddingRight: 10, fontWeight: 500, paddingLeft: 0, paddingTop: 10, paddingBottom: 10 }}>
        {'Sign in with Google'}
      </span>
    ]
  )

  return googleLoginButton
}

GoogleLoginButton.propTypes = {
  className: PropTypes.string,
  autoLoad: PropTypes.bool,
  render: PropTypes.func,
}

GoogleLoginButton.defaultProps = {
}

export default GoogleLoginButton