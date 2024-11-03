import React, {useEffect, useState} from 'react';
import { CerttableItem } from '../../components/user/UserInfoTable.tsx';
import {  CheckCertInfoModal } from '../../components/user/Modal.tsx';
import {ExpertEntity} from "../../components/user/props/ExpertProps.ts";
import {fetchData} from "../../util/fetchData.ts";
import {axiosGet, axiosPatch, axiosPost} from "../../util/axiosData.ts";
import {migHost} from "../../util/apiInof.ts";

export const CheckCert:React.FC = () => {

  const [formData, setFormData] = useState<ExpertEntity | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string>();
  const [imageAddr, setImageAddr] = useState<string>();
  const [hidden, setHidden] = useState(false);
  const [visionText, setVisionText] = useState<string>();

  const [experts, setExperts] = useState<ExpertEntity[]>([]);
  const [forum, setForum] = useState<Partial<ExpertEntity[]>>([]);

  const host = migHost()
      //import.meta.env.VITE_LOCAL_HOST;

  useEffect(() => {
    expertFetch()
  }, []);

  const expertFetch: () => void = async () => {

    await fetchData(host + 'expert/findAll').then(data => {
      data.map((user: Partial<ExpertEntity>) => {
        // @ts-ignore
        user.credentialStatus === 0 ? (setForum(prevForum => [...prevForum, user]),
        setExperts(prevData => [...prevData, user])) : null

      })
    })
  }

  const visionStart = () => {
    const json = {
      img: image
    }
    axiosPost(`${host}imgextract/certVision`, JSON.stringify(json)).then(async data => {
      setVisionText(data.data)
    })
    setHidden(!hidden);
  }

  const CheckButton = (expert: ExpertEntity) => {
    experts.map((user: ExpertEntity) => {
      if(user.expertCode === expert.expertCode)
        setFormData(user);
    })

    // setFormData(prevFormData  => ({...prevFormData, expert}))
    axiosGet(`${host}images/${expert.expertCode}`).then(async data => {
      console.log(data)
      setImageAddr(host+data.data);
      setImage(data.data);
    })
    // fetchData(`${host}images/${expert.expertCode}`).then(async data => {
    //   console.log('images, ', data)
    //   setImageAddr(host+data.certImage);
    //   setImage(data.certImage);
    // })

    handleModal()
  }

  const handleModal = () => {
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
    setFormData(undefined);
    setVisionText('');
    setHidden(false);
    // setFormData({}); // 폼 데이터 초기화
  };

  const denyCert = async (expert: ExpertEntity | undefined) => {
    console.log(expert)
    axiosGet(`${host}mail/certDenial`, expert).then(data => {
      console.log(data);
    })

    await fetch(`${host}expert/${expert?.expertCode}`, {
      method: 'DELETE',
    });
    deleteExpertForum(expert)
    setFormData(undefined);
    setVisionText('');
    setShowModal(false);
  }

  const deleteExpertForum = async (expert: ExpertEntity | undefined) => {
    setForum(forum?.filter(user => user?.expertCode !== expert?.expertCode)); // 삭제 후 상태 업데이트
  }

  // 유저 수정 저장 처리
  const handleSave = async (expert: ExpertEntity | undefined) => {
    const patchData = {
      credentialStatus: 1,
      expertCode: expert?.expertCode,
    }

    try{
       formData && axiosPatch(`${host}expert/${expert?.expertCode}`,patchData).then(data => {
         console.log(data?.status);
       })
      axiosGet(`${host}mail/createSuccess`, expert).then(data => {
        console.log(data);
      })

     }catch (error){
       console.log()
     }
    setFormData(undefined);
    deleteExpertForum(expert);
    setVisionText('');
    setShowModal(false);
  };

  return (
    <div>
      {forum && forum.map((user) => (
          <CerttableItem
              key={user?.expertCode} expert={user} CheckButton={CheckButton} />
          ))}

      <CheckCertInfoModal
        show={showModal}
        handleClose={handleClose}
        formData={formData}
        handleSave={handleSave}
        image={imageAddr}
        denyCert={denyCert}
        visionText={visionText}
        hidden={hidden}
        visionStart={visionStart}
      />
    </div>



  );
}