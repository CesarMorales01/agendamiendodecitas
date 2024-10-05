<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Key;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Globalvar;
use stdClass;

class RegistroController extends Controller
{
    public $global = null;

    public function __construct()
    {
        $this->global = new Globalvar();
    }

    public function index() {
        
    }

    public function create()
    {
        $info = DB::table('info_pagina')->first();
        $globalVars = $this->global->getGlobalVars();
        $auth = Auth()->user();
        $token = csrf_token();
        $resp = '';
        return Inertia::render('Auth/Register', compact('auth', 'info', 'globalVars', 'token', 'resp'));
    }

    public function store(Request $request)
    {
        DB::table('clientes')->insert([
            'nombre' => $request->name
        ]);
        $id = DB::getPdo()->lastInsertId();
        $user = Key::create([
            'name' => $request->name,
            'cedula' => $id,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        event(new Registered($user));
        Auth::login($user);
        return redirect(RouteServiceProvider::HOME);
    }


    public function show(string $email)
    {
        //Validar si hay existe una cuenta con el correo ingresado
        $usuario = new stdClass();
        $usuario->email="";
        $user = DB::table('keys')->where('email', '=', $email)->first();
        if ($user != null) {
            $usuario->email = $user->email;
        }
        return response()->json($usuario, 200, []);
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
