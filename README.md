#  Draggable Board 
상태 관리를 위한 드래그 앤 드랍 보드입니다.  


https://dnd-board-one.vercel.app/


## 프리뷰 
<img width="354" alt="image" src="https://user-images.githubusercontent.com/54101187/209566502-787a80e2-9e8a-4a5f-8a8d-f2218387d427.png">

## 주요 라이브러리
react-hook-form : input form 프로퍼티 관리  
recoil : 리코일을 이용한 상태 관리  
recoil-persist: atom 상태를 브라우저 로컬 스토리지에서 유지하기 위해 사용  
hello-pangea/dnd: 드래그 앤 드롭 기능을 위해 사용, beautiful-dnd는 리액트18 버젼 이하에 적합   
  
## 배포 : Vercel
Vercel의 가장 큰 장점은 기본적으로 HTTPS와 CDN이 적용된 상태로 배포됩니다.  
또한 git repository에 연결하면 변경된 코드를 메인 브랜치에 병합 시 코드를 빌드 후 배포 해주기 때문에  
CI/CD 자동화에 대한 환경을 고려하지 않아도 됩니다.
