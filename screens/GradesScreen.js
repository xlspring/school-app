import {View, Text, StyleSheet} from "react-native";
import HeaderText from "../components/HeaderText";
import ScreenContainer from "../components/ScreenContainer";
import GradeCard from "../components/GradeCard";

export default function GradesScreen() {
  return (
    <ScreenContainer scrollable={true}>
      <HeaderText text={'Your grades'} />

      <GradeCard
        subject={'Math'}
        lastDate={'12.04.2019 at 12:00'}
        grade={100}
      />
      <GradeCard
        subject={'English'}
        lastDate={'12.04.2019 at 12:00'}
        grade={80}
      />
      <GradeCard
        subject={'Physics'}
        lastDate={'12.04.2019 at 12:00'}
        grade={70}
      />
      <GradeCard
        subject={'Computer studies'}
        lastDate={'12.04.2019 at 12:00'}
        grade={60}
      />
      <GradeCard
        subject={'PE'}
        lastDate={'12.04.2019 at 12:00'}
        grade={50}
      />
      <GradeCard
        subject={'Math'}
        lastDate={'12.04.2019 at 12:00'}
        grade={100}
      />
      <GradeCard
        subject={'English'}
        lastDate={'12.04.2019 at 12:00'}
        grade={80}
      />
      <GradeCard
        subject={'Physics'}
        lastDate={'12.04.2019 at 12:00'}
        grade={70}
      />
      <GradeCard
        subject={'Computer studies'}
        lastDate={'12.04.2019 at 12:00'}
        grade={60}
      />
      <GradeCard
        subject={'PE'}
        lastDate={'12.04.2019 at 12:00'}
        grade={50}
      />

    </ScreenContainer>
  )
}

const styles = StyleSheet.create({

});