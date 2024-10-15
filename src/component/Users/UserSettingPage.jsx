import {FaCloudUploadAlt, FaDoorClosed} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import userContext from "./UserContext.js";
import UserContext from "./UserContext.js";
import {useContext, useEffect, useState} from "react";

export default function UserSettingPage(){
    const navigate = useNavigate()
    // 현재 선택된 user 정보를 가져오기
    const {user} = useContext(UserContext)
    const [state, setState] = useState()
    const [profileImage,setProfileImage] = useState()

    useEffect(() => {
        if(user){
            // 이미지 초기값 설정
            setProfileImage(`http://localhost:8080/upload/${user.img}`)
            setState(user)
        }
    }, [user]);

    //파일 대화상자 보이기
    function handleIconClick(){
        document.getElementById('fileInput').click()
    }
    // 입력값으로 state 변경하기
    function handleChange(e){
        setState({...state,[e.target.name]: e.target.value})
    }

    // 파일 선택을 하면 profileImage 상태값 변경하기
    function handleFileChange(e){
        const file = e.target.files[0]
        if(file && file.type.startsWith('image/')){
            // img 태그의 src 를 변경. src는 URL
            // 선택한 파일객체에 대해 URL 을 생성해 줍니다.(파일업로드 아니고 미리보기)
            const imageUrl = URL.createObjectURL(file)
            setProfileImage(imageUrl)
            setState({...state, img:file.name})   //사용자 정보 변경을 위해 파일명 업데이트
        }else{
            alert('이미지 파일만 선택할 수 있습니다.')
        }
    }

    function onSave(item){

    }

    console.log("handleFileChange state",state)
    return user && (
        <>
            <div className="item user item-form" style={{
                backgroundColor: "burlywood"
                , paddingTop: "5%"
            }}>

                <div style={styles.imageContainer}>
                    <img src={profileImage} alt={user?.name} style={styles.profileImage}/>
                    <div style={styles.cameraIcon} onClick={handleIconClick}>
                        📸
                    </div>
                    <input type="file" id="fileInput" style={{display: 'none'}} accept="image/*"
                           onChange={handleFileChange}/>
                </div>
                <label>Name</label>
                <p>
                    <input
                        type="text"
                        name="name"
                        value={state?.name}
                        onChange={handleChange}
                    />
                </p>

                <label>Title</label>
                <p>
                    <input
                        type="text"
                        name="title"
                        value={state?.title}
                        onChange={handleChange}
                    />
                </p>
                <label>Notes</label>
                <p>
                  <textarea
                      name="notes"
                      rows={6}
                      cols={30}
                      value={state?.notes}
                      onChange={handleChange}
                  />
                </p>
            </div>
            <p className="controls">
                <button
                        className="btn"
                        onClick={() => navigate(`/users?id=${user.id}`)}
                    >
                        <FaDoorClosed/>
                        <span>Close</span>
                </button>
                <button
                    className="btn"
                    onClick={() => onSave(state)}
                >
                    <FaCloudUploadAlt/>
                    <span>{/*{isNew ? "Add User" : "Update"}*/}Update</span>
                </button>
            </p>
        </>
    )
}

const styles = {
    imageContainer: {
        position: 'relative',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid #ddd',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {      //이미지가 없을 때
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
        color: '#aaa',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        borderRadius: '50%',
        padding: '5px',
        fontSize: '18px',
    },
};