import { ScrollView, StyleSheet, Text, View,SafeAreaView,TouchableOpacity,TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const passwordscheme=Yup.object().shape({
passwordlength: Yup.number()
.min(4,'shpuld be min of 4 character')
.max(16,'should be max of 16 character')
.required('Length is required')

})

export default function App() {
  const[password,setpassword]=useState('')
  const[ispassgenerated,setispassgenerated]=useState(false)
  const[lowercase,setLowerCase]=useState(true)
  const[uppercase,setUpperCase]=useState(false)
  const[number,useNumber]=useState(false)
  const[symbol,usesymbol]=useState( false)
  const generatePasswordString =(passwordlength:number)=>{
       let characterlist=''
       const uppercaseChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
       const lowercaseChars='abcdefghijklmnopqrstuvwxyz'
       const numberChars='1234567890'
       const symbolChars='!@#$%^&*'
       if(uppercase){
        characterlist += uppercaseChars
       }
       if(lowercase){
        characterlist += lowercaseChars
       }
       if(number){
        characterlist += numberChars
       }
       if(symbol){
        characterlist += symbolChars
       }
       const passwordresult  = createPassword(characterlist,passwordlength)
       setpassword(passwordresult)
       setispassgenerated(true)
       
  }
  const createPassword = (character:string,passwordlength:number)=>{
       let result=''
       for (let i = 0; i < passwordlength; i++) {
        const characterIndex = Math.round (Math.random()* character.length)
        result +=character.charAt(characterIndex)
       }
       return result
  }
  const resetPassword =() =>{
    setpassword('')
    setispassgenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    useNumber(false)
    usesymbol(false)

  }
  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
               <Text style={styles.title}>Password Generator</Text>
               <Formik
       initialValues={{  passwordlength: '' }}
       validationSchema={passwordscheme}
       onSubmit={values=>{
        console.log(values);
          generatePasswordString(+values.passwordlength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
        
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
         <View style={styles.inputcolumn}>
          <Text style={styles.heading}>Password Length</Text>
          {touched.passwordlength && errors.passwordlength&&(
            <Text style={styles.errorText}>
              {errors.passwordlength}
            </Text>
          )}
         
         </View>
         <TextInput 
           style={styles.inputstyle} 
           value={values.passwordlength}
           onChangeText={handleChange('passwordlength')}
           placeholder='Ex. 8'
           keyboardType='numeric'>
         
          </TextInput>
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={lowercase}
          onPress={() => setLowerCase(!lowercase)}
          fillColor="#29AB87"
          />
         </View>
         <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    onPress={() => setUpperCase(!uppercase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={number}
                    onPress={() => useNumber(!number)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbol}
                    onPress={() => usesymbol(!symbol)}
                    fillColor="#FC80A5"
                  />
                </View>
         <View style={styles.formAction}>
        
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={ () => {
            handleReset();
            resetPassword()
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
         </View>
         </>
       )}
     </Formik>
        </View>
        {ispassgenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer:{
    flex:1,
    paddingVertical:20,
    
  },
  formContainer:{
    margin: 8,
    padding: 8,
  
  },
  title:{
    fontSize:30,
    fontWeight:'bold'
  },
  inputWrapper:{
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  formAction:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputcolumn:{
    flexDirection: 'column',
  },
  inputstyle:{
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
    
  },
  errorText:{
    fontSize: 12,
    color: '#ff0d10',
  },
  heading:{
    fontSize:20,
    paddingVertical:20
  },
  primaryBtn:{
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  secondaryBtnTxt:{
    alignItems:'center',
    textAlign: 'center',
    justifyContent:'center',
    color:'#000'
  },
  secondaryBtn:{
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: '#CAD5E2',
    alignItems:'center',
    
    justifyContent:'center',
  },
  primaryBtnTxt:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },


})