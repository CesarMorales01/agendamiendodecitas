<?php

namespace App\Http\Controllers;

use App\Models\Globalvar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use DateTime;
use stdClass;
use App\Traits\MetodosGenerales;
use Illuminate\Support\Facades\Redirect;

class SessionController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
    }

    public function index()
    {
        $auth = Auth()->user();
        $globalVars = $this->global->getGlobalVars();
        $globalVars->info = DB::table('info_pagina')->first();
        $horarios_disponibles = $this->getHorarioCitas($this->getFechaHoy());
        $token = csrf_token();
        return Inertia::render('Splash', compact('auth', 'horarios_disponibles', 'globalVars', 'token'));
    }

    public function establecerDiaDeLaSemana($fecha)
    {
        $dayofweek = date('w', strtotime($fecha));
        $day = "Domingo";
        if ($dayofweek == 1) {
            $day = "Lunes";
        }
        if ($dayofweek == 2) {
            $day = "Martes";
        }
        if ($dayofweek == 3) {
            $day = "Miércoles";
        }
        if ($dayofweek == 4) {
            $day = "Jueves";
        }
        if ($dayofweek == 5) {
            $day = "Viernes";
        }
        if ($dayofweek == 6) {
            $day = "Sabado";
        }
        return $day;
    }

    public function getHorarioCitas($fecha)
    {
        $horarios_disponibles = [];
        $citas = DB::table('calendario_citas')->whereBetween('fecha', [$fecha, $fecha])->orderBy('id', 'desc')->where('estado_cita', '=', 'Pendiente')->get();
        $profesionales_citas = DB::table('profesionales_citas')->get();
        $horario = DB::table('horario_citas')->where('dia', '=', $this->establecerDiaDeLaSemana($fecha))->get();
        $horaInicio = new DateTime($horario[0]->inicio);
        $horaTermino = new DateTime($horario[0]->fin);
        // Establecer total horas disponibles
        $interval = $horaInicio->diff($horaTermino);
        for ($i = 0; $i < $interval->h; $i++) {
            $mifecha = date($horario[0]->inicio);
            //Sumar una hora desde el inicio del horario para establecer todas las horas disponibles
            $NuevaFecha = strtotime('+' . $i . ' hour', strtotime($mifecha));
            $NuevaFecha = date('H', $NuevaFecha);
            $objeto = new stdClass();
            $objeto->hora = $NuevaFecha;
            $objeto->profesionales = [];
            $profesionales_no_disponibles = [];
            if ($citas) {
                foreach ($citas as $cita) {
                    $token = strtok($cita->inicio, ":");
                    //Validar si hay horas con citas
                    if ($objeto->hora == $token) {
                        // Validar que profesional atiende la cita
                        for ($x = 0; $x < count($profesionales_citas); $x++) {
                            if ($profesionales_citas[$x]->id == $cita->profesional_seleccionado) {
                                //Se agregar al array solo los profesionales no disponibles
                                $profesionales_no_disponibles[] = $profesionales_citas[$x];
                            }
                        }
                    }
                }
                foreach ($profesionales_citas as $profe) {
                    if (count($profesionales_no_disponibles) > 0) {
                        $findProfe = true;
                        foreach ($profesionales_no_disponibles as $noProfe) {
                            if ($profe->id == $noProfe->id) {
                                $findProfe = false;
                            }
                        }
                        if ($findProfe) {
                            $objeto->profesionales[] = $profe;
                        }
                    } else {
                        $objeto->profesionales[] = $profe;
                    }
                }
            } else {
                // si no hay citas cargar todos las horas y los profesionales
                foreach ($profesionales_citas as $profe) {
                    $objeto->profesionales[] = $profe;
                }
            }
            $horarios_disponibles[] = $objeto;
        }
        return $horarios_disponibles;
    }

    public function mostrarCitasUsuario($mensaje = "")
    {
        //Mostrar citas de usuario
        $auth = Auth()->user();
        $globalVars = $this->global->getGlobalVars();
        $globalVars->info = DB::table('info_pagina')->first();
        $token = csrf_token();
        $miscitas = DB::table("calendario_citas")->where("email", "=", $auth->email)->where('estado_cita', '=', 'Pendiente')->get();
        foreach ($miscitas as $cita) {
            $profesional = DB::table('profesionales_citas')->where('id', '=', $cita->profesional_seleccionado)->first();
            $cita->profesional = $profesional;
        }
        return Inertia::render('Miscitas', compact('auth', 'globalVars', 'token', 'miscitas', 'mensaje'));
    }

    public function create() {}

    public function store(Request $request)
    {
        //Registrar citas
        $datos = json_decode(file_get_contents('php://input'));
        $horaFin = strtotime('+1 hour', strtotime($datos->hora));
        $horaFinFormat = date('H', $horaFin);
        $insert = DB::table('calendario_citas')->insert([
            'fecha' => $datos->fecha,
            'inicio' => $datos->hora,
            'fin' => $horaFinFormat . ":00",
            'cliente' => $datos->cliente,
            'idCliente'=>$datos->idCliente,
            'email' => $datos->email,
            'telefono' => $datos->telefono,
            'comentario' => $datos->comentario,
            'profesional_seleccionado' => $datos->profesional_selected
        ]);
        return response()->json($insert, 200, []);
    }

    public function show(string $fecha)
    {
        return $this->getHorarioCitas($fecha);
    }

    public function edit(string $id)
    {
        //Cancelar cita de usuario
        $update = DB::table('calendario_citas')->where('id', '=', $id)->update([
            'estado_cita' => "Cancelada"
        ]);
        return Redirect::route('calendar.citasusuario',["Cita cancelada!"]);
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
