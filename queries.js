import gql from 'graphql-tag';

const addFormMutation = gql`
  mutation addForm($name: String!, $date: String!, $data: String!){
    addForm( name: $name, date: $date, data: $data ){
      name
      date
      data
    }
  }

`

export { addFormMutation };