{/* <View style={[styles.inputContiner,
    {
      backgroundColor: focususerName ? '#ebfaf1' : '#FAFAFA',
      borderColor: focususerName ? PrimaryColor : '#FAFAFA'
    }
    ]}>
      <MaterialCommunityIcons name="email" size={20} color={focususerName ? PrimaryColor : "#9e9e9e"} />
      <TextInput style={styles.account}
        autoCorrect={false}
        placeholder='Tài khoản'
        value={username}
        onChangeText={text => setUsername(text)
        }
        onFocus={() => {
          setForcusUserName(!focususerName)
        }}
        onBlur={() => {
          setForcusUserName(!focususerName)
        }}
      >
      </TextInput>
    </View >
    <View style={[styles.inputContiner,
    {
      backgroundColor: focusPassword ? '#ebfaf1' : '#FAFAFA',
      borderColor: focusPassword ? PrimaryColor : '#FAFAFA'
    }
    ]}>

      <MaterialCommunityIcons name="lock" size={20} color={focusPassword ? PrimaryColor : "#9e9e9e"} />

      <TextInput style={[styles.password, { backgroundColor: focusPassword ? '#ebfaf1' : '#FAFAFA', }]}
        autoCorrect={false}
        placeholder='Mật khẩu'
        secureTextEntry={hidePassWord}
        value={password}
        onChangeText={text => setPassword(text)}
        onFocus={() => {
          setForcusPassword(!focusPassword)
        }}
        onBlur={() => {
          setForcusPassword(!focusPassword)
        }}
      >
      </TextInput>
      <MaterialCommunityIcons name={hidePassWord ? "eye" : "eye-off"}
        onPress={() => {
          setHidePassword(!hidePassWord)
        }}
        size={20} color={focusPassword ? PrimaryColor : "#9e9e9e"} />
    </View>

    <View style={[styles.inputContiner,
    {
      backgroundColor: focusConfirmPassword ? '#ebfaf1' : '#FAFAFA',
      borderColor: focusConfirmPassword ? PrimaryColor : '#FAFAFA'
    }
    ]}>

      <MaterialCommunityIcons name="lock" size={20} color={focusConfirmPassword ? PrimaryColor : "#9e9e9e"} />

      <TextInput style={[styles.confirmpassword, { backgroundColor: focusConfirmPassword ? '#ebfaf1' : '#FAFAFA', }]}
        autoCorrect={false}
        placeholder='Xác nhận mật khẩu'
        secureTextEntry={hideConfirmPassWord}
        value={confirmpassword}
        onChangeText={text => setPassword(text)}
        onFocus={() => {
          setForcusConfirmPassword(!focusConfirmPassword)
        }}
        onBlur={() => {
          setForcusConfirmPassword(!focusConfirmPassword)
        }}
      >
      </TextInput>

      <MaterialCommunityIcons name={hideConfirmPassWord ? "eye" : "eye-off"}
        onPress={() => {
          setHideConfirmPassword(!hideConfirmPassWord)
        }}
        size={20} color={focusConfirmPassword ? PrimaryColor : "#9e9e9e"} />
    </View> */}