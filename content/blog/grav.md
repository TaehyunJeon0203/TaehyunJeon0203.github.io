---
title: "'Grav' 프로젝트 매니저 앱 개발"

titleImage: "https://github.com/user-attachments/assets/3e0304c7-0040-4770-811b-6d1122744d4c"

date: "2024-09-16"

description: "게임 플레이 타임 기록되듯, 작업 시간이 기록되는 프로젝트 매니저"
---

**게임을 하다 문득 코드를 치는 시간도 기록되면 어떨까 하는 생각이 들었다.**

게임을 하다 보면 항상 보이는 그것. 바로 플레이 타임이다.
이는 묘한 기분을 들게 한다.

> 내가 벌써 이렇게 오래 했다고? 하는 신기함과, 뭔가 알 수 없는 묘한 성취감. 이것을 코드 칠 때도 느끼고 싶었다.

# 기획

직접 사용하기 위해 짜는 프로그램이었기에 내게 필요한 간단한 기능들만 생각했다.

프로젝트들을 열거하여 한 눈에 확인할 수 있게 하는 것.

전체 작업시간과 각 프로젝트 별 작업 시간 기록.

마지막으로 최근 2주간의 프로젝트별 작업 시간 기록.

# 개발 스택 선정

웹 기술로 간편하게 데스크톱 앱을 만들 수 있는 Electron 프레임워크를 사용했다. 크로뮴 기반이라 프로그램이 무거워진다는 단점이 있지만 짜려는 프로그램 자체가 그리 무겁지 않기도 하고, 웹 기술로 데스크톱 앱을 만든다는 장점이 더 크게 다가왔다.

메인 언어로는 배워보고 싶었던 Typescript를 사용하기로 했다.
JS만 주로 사용하며 동적 타입에 적응해 있던 나에게 TS의 엄격한 타입 규칙은 처음엔 나에게 불편함으로 다가왔다. 하지만 차차 적응해가며 불편함은 줄어들었다.

간단한 프로젝트였기에 빠르게 스타일링 코드를 작성할 수 있는 Tailwind 라이브러리를 사용했다.

# 동작 방식

동작 방식은 생각보다 간단하다.

프로젝트를 선택하고 시작 버튼을 누르게 되면 터미널 명령어가 실행되는 방식으로 작동한다.

명령어는 해당 프로젝트의 경로에서 VSCode를 실행하는 명령어이다.
지금껏 매번 IDE를 연 후에 작업 폴더를 찾아 여는 것이 일상이었던 나에게는 이 명령어조차 편리하게 다가왔다.

프로젝트가 VSCode에서 열리면 자동으로 전체 작업 시간 타이머와 해당 프로젝트의 작업 시간 타이머가 작동하며, VSCode가 종료되면 타이머도 함께 종료된다.

타이머는 로컬에 JSON 파일로 저장되도록 구현했으며, JSON파일에는 날짜별 작업 시간과, 전체 작업 시간이 기록되도록 했다.

날짜별 작업 시간은 최근 2주간 작업 시간을 계산할 때 이용되며, JSON파일이 점점 무거워지는 것을 방지하기 위해 2주가 지난 데이터는 자동으로 삭제되도록 구현했다.

타이머는 VSCode가 해당 프로젝트의 경로에서 열려 있을 때만 작동하는데, 이를 구현하는 데에 어려움이 많았다.

터미널에서 초 단위로 lsof 명령어가 작동하여 VSCode 프로세스가 실행 중인지 확인하고, 추가로 열려있는 경로가 해당 프로젝트의 경로와 일치하는지도 확인해야 했다.

터미널 명령어를 프로그램 구현에 직접적으로 사용해 본 게 처음이라 조금은 생소했다.

# Front-end

![animation preview](https://github.com/user-attachments/assets/b5feece7-5888-40b4-8747-a449ad18702e)
어떤 프로젝트를 하더라도 디자인이 어렵다는 생각을 한다.

이번에도 역시 디자인이 어려움으로 다가왔다.

그 중에서도 프로젝트 카드에 마우스가 올라갔을 때 마치 카드 아래쪽이 들리는 것처럼 보이게 하고 싶었는데 이를 구현하는 데에 어려움이 많았다.

카드 아래쪽 그림자는 간단하게 만들 수 있었지만, 카드 위의 빛이 반사되는 것이 카드가 움직이는 애니메이션과 이질감 없이 작동하게 하는 것이 어려웠다.

우측 상단에 광택과 비슷한 색으로 직사각형을 만든 후, 프로젝트 카드 위에 표시되는 부분 바깥은 숨겼다.

이후 프로젝트 카드가 움직이는 애니메이션이 작동할 때 그에 맞춰 직사각형의 크기가 커지도록 구현하니 내가 원하는 형태로 작동했다.

이외의 디자인을 화려하게 할 필요는 없다고 생각되어 간단하게 작업 시간만 표시되게 하고, 각 프로젝트들을 카드 형식으로 나열하고, 그 위에 프로젝트별 플레이 타임과 오픈 버튼만 배치했다.

# Back-end

Back-end라고 하기엔 애매하지만 파일 시스템을 이용하여 프로젝트 등록 시에 프로젝트 이름과 경로 등을 받아서 정리하고, 지속적으로 렌더러 프로세스와 통신하여 작업 시간의 상태를 업데이트 하도록 구성했다.

# 배포

![preview](https://github.com/user-attachments/assets/c12098c1-4c92-413d-92f4-1ffa157dbf0c)

Electron을 이용했기에 간편하게 실행파일로 빌드해서 배포할 수 있었다.

[해당 프로젝트 Repository](https://github.com/TaehyunJeon0203/grav/releases)의 릴리즈 탭을 통해 진행했다.

# 마지막으로

나의 필요에 의해 짠 프로그램은 처음이라 내가 생각한 게 그대로 구현됐다는 게 즐거웠다.

직접 만들었기에 더욱 정이 가는 프로그램인 것 같다.

여전히 계속 사용 중인데, 이런 저런 기능들을 추가해 프로젝트를 더욱 키워보고 싶다는 생각이 들곤 한다.

이는 추후 생각이 정리된다면 더 자세히 다룰 수 있을 것 같다.

내가 필요해서 시작한 프로젝트기에 따로 홍보를 한다거나 하는 노력은 하지 않았다.

주변 사람들 몇 명에게 베타버전 배포 후에 피드백 받았지만 더 많은 사람들이 사용해 보고 피드백 할 수 있는 기회가 있다면 좀 더 좋았을 것 같다.