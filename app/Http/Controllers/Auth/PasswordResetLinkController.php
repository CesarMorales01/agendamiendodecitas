<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Globalvar;
use App\Models\Key;
use Illuminate\Support\Facades\Hash;

class PasswordResetLinkController extends Controller
{

    public $global = null;

    public function __construct()
    {
        $this->global = new Globalvar();
    }

    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
            'globalVars' => $this->global->getGlobalVars(),
            'message' => '',
            'email' => ''
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
        $validarCorreo = Key::where('email', '=', $request->email)->get();
        if (count($validarCorreo) == 0) {
            $status = "Correo no encontrado!";
            return back()->with('status', __($status));
        } else {
            $newpass = $this->generatepassword();
            Key::where('email', '=', $request->email)->update([
                'password' => Hash::make($newpass)
            ]);
            $status = "Se ha enviado un correo con la nueva contraseña!";
            return Inertia::render('Auth/ForgotPassword', [
                'status' => $status,
                'globalVars' => $this->global->getGlobalVars(),
                'message' => $newpass,
                'email' => $request->email
            ]);
        }
    }

    public function generatepassword()
    {
        $key = "";
        $pattern = "1234567890abcdefghijklmnopqrstuvwxyz";
        $max = strlen($pattern) - 1;
        for ($i = 0; $i < 6; $i++) {
            $key .= substr($pattern, mt_rand(0, $max), 1);
        }
        return $key;
    }
}
