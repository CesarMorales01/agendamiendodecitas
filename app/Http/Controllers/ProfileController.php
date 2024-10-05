<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Globalvar;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Traits\MetodosGenerales;
use Illuminate\Support\Facades\DB;
use stdClass;

class ProfileController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
    }

    public function edit(Request $request): Response
    {
        $auth = Auth()->user();
        $globalVars = $this->global->getGlobalVars();
        $globalVars->info = DB::table('info_pagina')->first();
        $token = csrf_token();
        $mustVerifyEmail = $request->user() instanceof MustVerifyEmail;
        $status = session('status');
        return Inertia::render('Profile/Edit', compact('auth', 'globalVars', 'token', 'mustVerifyEmail', 'status'));
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        $request->user()->save();
        return Redirect::route('profile.edit');
    }

    public function borrarCliente($id){
        DB::table('clientes')->where("id", "=", $id)->delete();
    }

    public function borrarCitas($email){
        DB::table('calendario_citas')->where("email", "=", $email)->delete();
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);
        $user = $request->user();
        Auth::logout();
        $user->delete();
        $this->borrarCliente($user->cedula);
        $this->borrarCitas($user->email);
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Redirect::to('/');
    }
}
