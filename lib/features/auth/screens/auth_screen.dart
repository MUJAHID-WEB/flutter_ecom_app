import 'package:ecom/common/widgets/custom_button.dart';
import 'package:ecom/common/widgets/custom_textfield.dart';
import 'package:ecom/constants/global_variables.dart';
import 'package:ecom/features/auth/services/auth_service.dart';
import 'package:flutter/material.dart';

enum Auth {
  // for listtile - leading value
  signin,
  signup,
}

class AuthScreen extends StatefulWidget {
  static const String routeName = '/auth-screen'; // for router.dart
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  Auth _auth = Auth.signup; // for listtile - leading groupvalue
  final _signUpFormKey = GlobalKey<FormState>(); //for sign up form
  final _signInFormKey = GlobalKey<FormState>(); //for sign in form
  final AuthService authService = AuthService(); //for SignUpUser function
  final TextEditingController _emailController =
      TextEditingController(); //this is used in FORM
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();

  @override
  void dispose() {
//dispose the TextEditingController
    super.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
  }

  void signUpUser() {
    //it is called in auth_service.dart
    // it will use in sign Up button
    authService.signUpUser(
      context: context,
      email: _emailController.text,
      password: _passwordController.text,
      name: _nameController.text,
    );
  }

  void signInUser() {
    authService.signInUser(
      context: context,
      email: _emailController.text,
      password: _passwordController.text,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalVariables.greyBackgroundCOlor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Welcome',
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w500,
                ),
              ),
              ListTile(
                tileColor: _auth == Auth.signup
                    ? GlobalVariables.backgroundColor
                    : GlobalVariables.greyBackgroundCOlor,
                //sign up
                title: const Text(
                  'Create Account',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                leading: Radio(
                  value: Auth.signup, //from enum at the top
                  groupValue: _auth, //from start widget
                  onChanged: (Auth? val) {
                    setState(
                      () {
                        _auth = val!;
                      },
                    );
                  },
                ),
              ),
              if (_auth == Auth.signup)
                Container(
                  padding: const EdgeInsets.all(8),
                  color: GlobalVariables.backgroundColor,
                  child: Form(
                    key: _signUpFormKey, //This called on top in final
                    child: Column(
                      children: [
                        CustomTextField(
                          controller:
                              _nameController, // final call with TextEditingController
                          hintText:
                              'Name', //This come from custom_textfield.dart
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        CustomTextField(
                          controller:
                              _emailController, // final call with TextEditingController
                          hintText:
                              'Email', //This come from custom_textfield.dart
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        CustomTextField(
                          controller:
                              _passwordController, // final call with TextEditingController
                          hintText:
                              'Password', //This come from custom_textfield.dart
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        CustomButton(
                            text: 'Sign Up',
                            onTap: () {
                              //using validator in custom_textfield.dart
                              if (_signInFormKey.currentState!.validate()) {
                                signUpUser(); //it is called in auth_service.dart
                              }
                            })
                      ],
                    ),
                  ),
                ),
              ListTile(
                tileColor: _auth == Auth.signin
                    ? GlobalVariables.backgroundColor
                    : GlobalVariables.greyBackgroundCOlor,
                //sing in
                title: const Text(
                  'Sign In',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                leading: Radio(
                  value: Auth.signin, //from enum at the top
                  groupValue: _auth, //from start widget
                  onChanged: (Auth? val) {
                    setState(
                      () {
                        _auth = val!;
                      },
                    );
                  },
                ),
              ),
              if (_auth == Auth.signin)
                Container(
                  padding: const EdgeInsets.all(8),
                  color: GlobalVariables.backgroundColor,
                  child: Form(
                    key: _signInFormKey, //This called on top in final
                    child: Column(
                      children: [
                        CustomTextField(
                          controller:
                              _emailController, // final call with TextEditingController
                          hintText:
                              'Email', //This come from custom_textfield.dart
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        CustomTextField(
                          controller:
                              _passwordController, // final call with TextEditingController
                          hintText:
                              'Password', //This come from custom_textfield.dart
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        CustomButton(
                            text: 'Sign In',
                            onTap: () {
                              if (_signInFormKey.currentState!.validate()) {
                                signInUser();
                              }
                            })
                      ],
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
