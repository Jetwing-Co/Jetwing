// Raven B4 script: freezes local movement while preserving look packets.
private double savedMotionX;
private double savedMotionY;
private double savedMotionZ;
private int lastHurtTime;
private int stasisPausedTicks;
private int pulseElapsedTicks;
private int pulseReleaseTicks;

void onLoad() {
    modules.registerSlider("pulse", "ticks", 0, 0, 100, 1);
    modules.registerSlider("pulse off", "ticks", 0, 0, 100, 1);
}

void onEnable() {
    Vec3 motion = client.getMotion();
    savedMotionX = motion.x;
    savedMotionY = motion.y;
    savedMotionZ = motion.z;
    lastHurtTime = client.getPlayer().getHurtTime();
    stasisPausedTicks = 0;
    pulseElapsedTicks = 0;
    pulseReleaseTicks = 0;
    freezeMotion();
    freezeInput();
}

void onDisable() {
    client.setMotion(savedMotionX, savedMotionY, savedMotionZ);
}

void onPreUpdate() {
    updatePauseTimers();
    if (isPaused()) {
        return;
    }

    freezeMotion();
    freezeInput();
}

void onPrePlayerInput() {
    freezeInput();
}

void onPostPlayerInput() {
    freezeInput();
    if (!isPaused()) {
        freezeMotion();
    }
}

void onPostMotion() {
    if (isPaused()) {
        return;
    }

    freezeMotion();
}

boolean onPacketSent(CPacket packet) {
    // C04/C05/C06 are exposed through the C03 wrapper; only allow C05 look packets.
    if (packet instanceof C03) {
        return ((C03) packet).name.startsWith("C05");
    }

    return true;
}

void freezeMotion() {
    client.setMotion(0.0, 0.0, 0.0);
}

void freezeInput() {
    client.setForward(0.0F);
    client.setStrafe(0.0F);
    client.setJump(false);
    client.setSneak(false);
    client.setSprinting(false);
}

void updatePauseTimers() {
    int hurtTime = client.getPlayer().getHurtTime();
    if (hurtTime > lastHurtTime) {
        stasisPausedTicks = 20;
    } else if (stasisPausedTicks > 0) {
        stasisPausedTicks--;
    }

    int pulseInterval = (int) modules.getSlider(scriptName, "pulse");
    if (pulseInterval <= 0) {
        pulseElapsedTicks = 0;
        pulseReleaseTicks = 0;
    } else if (pulseReleaseTicks > 0) {
        pulseReleaseTicks--;
    } else if (++pulseElapsedTicks >= pulseInterval) {
        pulseElapsedTicks = 0;
        pulseReleaseTicks = (int) modules.getSlider(scriptName, "pulse off");
        if (pulseReleaseTicks > 0) {
            client.setMotion(savedMotionX, savedMotionY, savedMotionZ);
        }
    }

    lastHurtTime = hurtTime;
}

boolean isPaused() {
    return stasisPausedTicks > 0 || pulseReleaseTicks > 0;
}
