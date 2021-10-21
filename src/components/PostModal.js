import React, {useState} from 'react';
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import {connect} from "react-redux";
import firebase from "firebase";
import {postArticleAPI} from "../actions";

const PostModal = (props) => {
    const [editorText, setEditorText] = useState('');
    const [shareImage, setShareImage] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [assetArea, setAssetArea] = useState('');

    const switchAssetArea = (area) => {
        setShareImage('');
        setVideoLink('');
        setAssetArea(area)
    }

    const postArticle = (e) => {
        e.preventDefault()

        if (e.target !== e.currentTarget) {
            return
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now()
        }

        props.postArticleAPI(payload)

        reset(e)
    }

    const handleChange = (e) => {
        const image = e.target.files[0];
        if (image === '' || image === undefined) {
            alert(`not an image, the file is a ${typeof image}`)
            return;
        }
        setShareImage(image)
    }

    const reset = (e) => {
        setEditorText('');
        setShareImage('');
        setVideoLink('');
        setAssetArea('');
        props.handleClick(e);
    }

    console.log(props.user)

    return (
        <>{props.showModal === 'open' &&
        <Container className={props.showModal}>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button onClick={reset}>
                        <img src="/images/close-icon.svg" alt="close-icon"/>
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        {props?.user?.photoURL ? <img src={props.user.photoURL} alt="user img"/> :
                            <img src="/images/user.svg" alt="user img"/>}
                        {props?.user?.displayName ? <span>{props.user.displayName}</span> : <span>Name</span>}
                    </UserInfo>
                    <Editor>
                        <textarea
                            value={editorText}
                            onChange={(e) => setEditorText(e.target.value)}
                            placeholder={'What do you want to talk about?'}
                            autoFocus={true}/>
                        {assetArea === 'image' ?
                            <UploadImage>
                                <input type={'file'}
                                       accept={'image/gif, image/jpeg, image/png'}
                                       name={'image'}
                                       id={'file'}
                                       style={{display: 'none'}}
                                       onChange={handleChange}/>
                                <p>
                                    <label htmlFor="file">Select an image to share</label>
                                </p>
                                {shareImage && <img src={URL.createObjectURL(shareImage)} alt="share iamge"/>}
                            </UploadImage>
                            : assetArea === 'media' &&
                            <>
                                <input type="text"
                                       placeholder={'Pleas input a video link'}
                                       value={videoLink}
                                       onChange={e => setVideoLink(e.target.value)}
                                />
                                {videoLink && <ReactPlayer width={'100%'} url={videoLink} controls={true}/>}
                            </>
                        }
                    </Editor>
                </SharedContent>
                <ShareCreation>
                    <AttachAssets>
                        <AssetButton onClick={() => switchAssetArea('image')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                 className="mercado-match" width="24" height="24" focusable="false">
                                <path
                                    d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"/>
                            </svg>
                        </AssetButton>
                        <AssetButton onClick={() => switchAssetArea('media')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                 className="mercado-match" width="24" height="24" focusable="false">
                                <path
                                    d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"/>
                            </svg>
                        </AssetButton>
                    </AttachAssets>
                    <ShareComment>
                        <AssetButton>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16"
                                 className="mercado-match" width="16" height="16" focusable="false">
                                <path
                                    d="M5 8h5v1H5zm11-.5v.08a6 6 0 01-2.75 5L8 16v-3H5.5A5.51 5.51 0 010 7.5 5.62 5.62 0 015.74 2h4.76A5.5 5.5 0 0116 7.5zm-2 0A3.5 3.5 0 0010.5 4H5.74A3.62 3.62 0 002 7.5 3.53 3.53 0 005.5 11H10v1.33l2.17-1.39A4 4 0 0014 7.58zM5 7h6V6H5z"/>
                            </svg>
                            <span>Anyone</span>
                        </AssetButton>
                    </ShareComment>
                    <PostButton disabled={!editorText ? true : false} onClick={postArticle}>
                        Post
                    </PostButton>
                </ShareCreation>
            </Content>
        </Container>
        }
        </>
    );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  animation: fadeIn 0.3s linear;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.16);
    border-radius: 50%;
    background: none;
    border: none;

    img, svg {
      pointer-events: none;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.08)
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;

  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);

  img, svg {
    fill: rgba(0, 0, 0, 0.6);
  }
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;

  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${props => props.disabled ? 'rgba(0,0,0,0.8)' : '#0a66c2'};
  color: ${props => props.disabled ? 'rgba(1,1,1,0.2)' : 'white'};

  &:hover {
    background: ${props => props.disabled ? "rgba(0,0,0,0.8)" : '#004182'};
  }

`;

const Editor = styled.div`
  padding: 12px 24px;

  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;

  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}

export default connect(mapStateToProps, {postArticleAPI})(PostModal);