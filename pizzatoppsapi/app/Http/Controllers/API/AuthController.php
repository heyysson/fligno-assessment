<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Notification;
use App\Notifications\SendEmailNotification;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request -> all(), [
            'username' => 'required|max:191|unique:users,username',
            'name' => 'required|max:191',
            'address' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'phone' => 'required|min:11|max:12',
            'password' => 'required|min:8',
        ]);

        if ($validator -> fails()) {
            return response() -> json([
                'validation_errors' => $validator -> messages(),
            ]);
        }
        else {
            $user = User::create([
                'username' => $request -> username,
                'name' => $request -> name,
                'address' => $request -> address,
                'email' => $request -> email,
                'phone' => $request -> phone,
                'password' => Hash::make($request -> password),
            ]);

            $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;

            return response() -> json([
                'status' => 200,
                'username' => $user -> username,
                'token' => $token,
                'message' => 'Registered Successfully',
            ]);
        }
    }

    public function login(Request $request) {
        $validator = Validator::make($request -> all(), [
            'username' => 'required|max:191',
            'password' => 'required',
        ]);

        if ($validator -> fails()) {
            return response() -> json([
                'validation_errors' => $validator -> messages(),
            ]);
        }
        else {
            $user = User::where('username', $request->username)->first();
 
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response() -> json([
                    'status' => 401,
                    'message' => 'Invalid Username or Password',
                ]);
            }
            else {
                if ($user->role_as == 1 ) { // 1 = Admin
                    $role = 'admin';
                    $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else {
                    $role = '';
                    $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;
                }

                return response() -> json([
                    'status' => 200,
                    'username' => $user -> username,
                    'token' => $token,
                    'message' => 'Logged In Successfully',
                    'role' => $role,
                ]);
            }
        }
    }

    public function logout() {
        auth() -> user() -> tokens() -> delete();
        return response() -> json([
            'status' => 200,
            'message' => 'Logged Out Successfully',
        ]);
    }

    public function sendNotification() {
        $user = User::all();

        $details = [
            'greeting' => "Hi Pizza TOPPS Customer",
            'body' => "Thank you for registering. Rest assured your details are safe.",
            'actiontext' => "Go to Homepage",
            'actionURL' => "http://localhost:3000/",
            'lastline' => "Start Ordering Now!",
        ];

        Notification::send($user, new SendEmailNotification($details));

        dd('done');
    }

}
