import React, { Component } from 'react'
import { StyleSheet, Image, Dimensions } from 'react-native'
import { Container, Content, Card, CardItem, Body, Text } from 'native-base'
import moment from 'moment-timezone'
import { feedCollection } from '../modules/firebase'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
      feeds: null,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Instagram',
  })

  componentWillMount () {
    this.unsubscribe = feedCollection.orderBy('created_at').onSnapshot(querySnapshot => {
      const feeds = []
      querySnapshot.forEach(doc => {
        feeds.push({ uuid: doc.id, ...doc.data() })
      })
      feeds.reverse()
      this.setState({ feeds })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          {this.state.feeds && this.state.feeds.map(element => {
            let date
            try {
              date = moment.unix(element.created_at.seconds).format('YYYY/MM/DD HH:mm:ss')
            }
            catch (e) {
              console.log(e)
              date = '投稿日不明'
            }

            return (
              <Card style={styles.card} key={element.uuid}>
                <CardItem cardBody button onPress={() => this.props.navigation.navigate('Detail', { uuid: element.uuid })}>
                  <Image
                    style={styles.image}
                    source={{uri: element.image}}
                  />
                </CardItem>
                <CardItem style={styles.inner} button onPress={() => this.props.navigation.navigate('Detail', { uuid: element.uuid })}>
                  <Body>
                    <Text>{element.message}</Text>
                    <Text style={styles.date}>{date}</Text>
                  </Body>
                </CardItem>
              </Card>
            )
          })}
        </Content>
      </Container>
    )
  }
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width,
    height: 300,
  },
  image: {
    width: width,
    height: 200,
    overflow: 'hidden',
  },
  date: {
    position: 'absolute',
    top: 50,
    left: 0,
    color: 'gray',
    fontSize: 10.5,
  },
})

export default HomeScreen

