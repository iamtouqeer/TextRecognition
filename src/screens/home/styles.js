import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  cellContainer: {
    justifyContent: 'center',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    backgroundColor: '#1C1C1E',
  },
  textContainer: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
